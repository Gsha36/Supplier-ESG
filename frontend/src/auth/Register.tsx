import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  ToastAction,
  ToastViewport,
  ToastProvider,
} from "@/components/ui/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

interface SupplierFormData {
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  email: string;
}

interface CompanyUserFormData {
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  email: string;
  role: string;
}

interface CompanyFormData {
  companyName: string;
  address: string;
  officialEmail: string;
  officialPhoneNumber: string;
}

// Generic handler type
type FormData = SupplierFormData | CompanyUserFormData | CompanyFormData;

const Register = () => {
  const [supplierFormData, setSupplierFormData] = useState<SupplierFormData>({
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
  });

  const [companyUserFormData, setCompanyUserFormData] =
    useState<CompanyUserFormData>({
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      email: "",
      role: "",
    });

  const [companyFormData, setCompanyFormData] = useState<CompanyFormData>({
    companyName: "",
    address: "",
    officialEmail: "",
    officialPhoneNumber: "",
  });
  const { toast } = useToast(); // Toast hook from Shadcn

  axios.defaults.baseURL = "http://127.0.0.1:8000"; // Set base URL for axios

  // Handlers for input change with specific types
  const handleInputChange = <T extends FormData>(
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role: string) => {
    setCompanyUserFormData((prevData) => ({
      ...prevData,
      role: role,
    }));
  };

  // Submit handler for Supplier
  const handleSupplierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supplierFormData.password !== supplierFormData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
        action: <ToastAction altText="Try again">Undo</ToastAction>,
      });
      return;
    }

    try {
      const response = await axios.post("/api/v1/users/signup", {
        username: supplierFormData.username,
        password: supplierFormData.password,
        phoneNumber: supplierFormData.phoneNumber,
        email: supplierFormData.email,
        role: "Supplier",
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Supplier registered successfully",
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to register supplier",
        variant: "destructive",
        action: <ToastAction altText="Try again">Undo</ToastAction>,
      });
    }
  };

  // Submit handler for Company User
  const handleCompanyUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (companyUserFormData.password !== companyUserFormData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
        action: <ToastAction altText="Try again">Undo</ToastAction>,
      });
      return;
    }

    try {
      const response = await axios.post("/api/v1/users/signup", {
        username: companyUserFormData.username,
        password: companyUserFormData.password,
        phoneNumber: companyUserFormData.phoneNumber,
        email: companyUserFormData.email,
        role: "Admin",
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Company user registered successfully",
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to register company user",
        variant: "destructive",
        action: <ToastAction altText="Try again">Undo</ToastAction>,
      });
    }
  };

  // Submit handler for Company
  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/users/company/register", {
        companyName: companyFormData.companyName,
        address: companyFormData.address,
        officialEmail: companyFormData.officialEmail,
        officialPhoneNumber: companyFormData.officialPhoneNumber,
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Company registered successfully",
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to register company",
        variant: "destructive",
        action: <ToastAction altText="Try again">Undo</ToastAction>,
      });
    }
  };

  return (
    <ToastProvider>
      <div className="w-full max-w-lg mx-auto mt-10">
        <Tabs defaultValue="supplier" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="supplier">Register Supplier</TabsTrigger>
            <TabsTrigger value="companyUser">Register Company User</TabsTrigger>
            <TabsTrigger value="company">Register Company</TabsTrigger>
          </TabsList>

          <TabsContent value="supplier">
            <Card>
              <CardHeader>
                <CardTitle>Register Supplier</CardTitle>
                <CardDescription>
                  Fill in the details to register as a supplier.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={supplierFormData.username}
                    onChange={(e) => handleInputChange(e, setSupplierFormData)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={supplierFormData.password}
                    onChange={(e) => handleInputChange(e, setSupplierFormData)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={supplierFormData.confirmPassword}
                    onChange={(e) => handleInputChange(e, setSupplierFormData)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={supplierFormData.phoneNumber}
                    onChange={(e) => handleInputChange(e, setSupplierFormData)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={supplierFormData.email}
                    onChange={(e) => handleInputChange(e, setSupplierFormData)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSupplierSubmit}>
                  Register Supplier
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="companyUser">
            <Card>
              <CardHeader>
                <CardTitle>Register Company User</CardTitle>
                <CardDescription>
                  Fill in the details to register as a company user.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={companyUserFormData.username}
                    onChange={(e) =>
                      handleInputChange(e, setCompanyUserFormData)
                    }
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={companyUserFormData.password}
                    onChange={(e) =>
                      handleInputChange(e, setCompanyUserFormData)
                    }
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={companyUserFormData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange(e, setCompanyUserFormData)
                    }
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={companyUserFormData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange(e, setCompanyUserFormData)
                    }
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={companyUserFormData.email}
                    onChange={(e) =>
                      handleInputChange(e, setCompanyUserFormData)
                    }
                    required
                  />
                </div>

                {/* Dropdown menu for role selection */}
                <div className="space-y-1">
                  <Label htmlFor="role">Select Role</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {companyUserFormData.role || "Select Role"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleRoleSelect("Admin")}
                      >
                        Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRoleSelect("Employee")}
                      >
                        Employee
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCompanyUserSubmit}>
                  Register Company User
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Register Company</CardTitle>
                <CardDescription>
                  Fill in the details to register a company.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={companyFormData.companyName}
                    onChange={(e) => handleInputChange(e, setCompanyFormData)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={companyFormData.address}
                    onChange={(e) => handleInputChange(e, setCompanyFormData)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="officialEmail">Official Email</Label>
                  <Input
                    id="officialEmail"
                    name="officialEmail"
                    type="email"
                    value={companyFormData.officialEmail}
                    onChange={(e) => handleInputChange(e, setCompanyFormData)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="officialPhoneNumber">
                    Official Phone Number
                  </Label>
                  <Input
                    id="officialPhoneNumber"
                    name="officialPhoneNumber"
                    type="tel"
                    value={companyFormData.officialPhoneNumber}
                    onChange={(e) => handleInputChange(e, setCompanyFormData)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCompanySubmit}>Register Company</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Toast notifications will show up here */}
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default Register;
