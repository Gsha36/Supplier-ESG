import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ToastProvider } from "@/components/ui/toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Questions from "../SupplierQuestions/EnvironmentalQuestions";



const SupplierDashboard: React.FC = () => {
  const { user, login } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState<string>("");
  const [total_revenue, setTotal_revenue] = useState<number | undefined>(
    undefined
  );
  const [panCard, setPanCard] = useState<string>("");
  const [GSTNo, setGSTNo] = useState<string>("");
  const [suppliesTo, setSuppliesTo] = useState([
    { companyName: "", date: new Date() },
  ]);
  const [passwordDrawerOpen, setPasswordDrawerOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  axios.defaults.baseURL = "http://127.0.0.1:8000";

  // console.log("user", user)
  

  const handleDateSelect = (selectedDate: Date | undefined, index: number) => {
    setSuppliesTo(
      suppliesTo.map((supply, i) =>
        i === index ? { ...supply, date: selectedDate || new Date() } : supply
      )
    );
  };

  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.patch(
        `/api/v1/users/resetPassword/${user?.accessToken}`,
        {
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,  
          },
          withCredentials: true, 
        }
      );

      if (response.status === 200) {
        const { user: updatedUser, accessToken } = response.data.data;
        login(updatedUser, accessToken);
        toast({
          title: "Success",
          description: "Password updated successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Failure",
          description: response.data.message || "Password update failed",
          variant: "destructive",
        });
      }

      if (response.data.success && user?.allData === false) {
        setProfileDrawerOpen(true);
        setPasswordDrawerOpen(false);
      } else {
        setPasswordDrawerOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
        action: <ToastAction altText="Try again">Undo</ToastAction>,
      });
    }
  };

  const handleSupplierInfoSubmit = async () => {
    try {
      const response = await axios.post(
        "/api/v1/supplier/updateSupplierInfo",
        {
          address,
          total_revenue,
          panCard,
          GSTNo,
          suppliesTo,
          username: user?.username,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const updatedUser = response.data.data.user;
        const accessToken = user.accessToken;
        login(updatedUser, accessToken);
        toast({
          title: "Success",
          description: "Supplier info updated successfully",
          variant: "default",
        });
        setProfileDrawerOpen(false);
      } else {
        toast({
          title: "Failure",
          description: response.data.message || "Supplier info update failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Supplier info update failed",
        variant: "destructive",
        action: <ToastAction altText="Try again">Undo</ToastAction>,
      });
    }
  };

  return (
    <div>
      <ToastProvider>
       <Questions/>

        {/* Password Drawer */}
        {user?.ownPassword === false && (
          <Drawer
            open={passwordDrawerOpen}
            onOpenChange={setPasswordDrawerOpen}
          >
            <DrawerTrigger asChild>
              <Button onClick={() => setPasswordDrawerOpen(true)}>
                Set New Password
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Update Password</DrawerTitle>
                <DrawerDescription>
                  Please set your new password
                </DrawerDescription>
              </DrawerHeader>
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <DrawerFooter>
                <Button onClick={handlePasswordSubmit}>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}

        {/* Profile Completion Drawer */}
        {user?.allData === false && (
          <Drawer open={profileDrawerOpen} onOpenChange={setProfileDrawerOpen}>
            <DrawerTrigger asChild>
              <Button onClick={() => setProfileDrawerOpen(true)}>
                Complete Your Profile
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Complete Your Profile</DrawerTitle>
                <DrawerDescription>
                  Please provide your details
                </DrawerDescription>
              </DrawerHeader>
              <div>
                <Label>Address</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Label>Total Revenue</Label>
                <Input
                  type="number"
                  value={total_revenue}
                  onChange={(e) => setTotal_revenue(Number(e.target.value))}
                />
                <Label>PAN Card</Label>
                <Input
                  value={panCard}
                  onChange={(e) => setPanCard(e.target.value)}
                />
                <Label>GST Number</Label>
                <Input
                  value={GSTNo}
                  onChange={(e) => setGSTNo(e.target.value)}
                />

                <Label>Supplies To</Label>
                {suppliesTo.map((item, index) => (
                  <div key={index}>
                    <Label>Company Name</Label>
                    <Input
                      value={item.companyName}
                      onChange={(e) =>
                        setSuppliesTo(
                          suppliesTo.map((supply, i) =>
                            i === index
                              ? { ...supply, companyName: e.target.value }
                              : supply
                          )
                        )
                      }
                    />

                    <Label>Date</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        readOnly
                        value={item.date.toISOString().split("T")[0]} // Show formatted date
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <CalendarIcon className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={item.date}
                            onSelect={(selectedDate) =>
                              handleDateSelect(selectedDate, index)
                            }
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                ))}
              </div>
              <DrawerFooter>
                <Button
                  onClick={handleSupplierInfoSubmit}
                  disabled={
                    !address ||
                    !total_revenue ||
                    !panCard ||
                    !GSTNo ||
                    suppliesTo.some((item) => !item.companyName || !item.date)
                  }
                >
                  Submit
                </Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </ToastProvider>
    </div>
  );
};

export default SupplierDashboard;
