import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [role, setRole] = useState<string>("");
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  axios.defaults.baseURL = "http://127.0.0.1:8000"; // Set base URL for axios

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login for different roles
  const handleLogin = async (roleType: string) => {
    try {
      const response = await axios.post("/api/v1/users/login", {
        username: formData.username,
        password: formData.password,
        role: roleType, // Role passed depending on which login tab is active
      });

      if (response.status === 200) {
        const { user, accessToken } = response.data.data;
        console.log("login",user, accessToken);

        login(user, accessToken);
        navigate("/supplier-dashboard");

        toast({
          title: "Success",
          description: `${roleType} logged in successfully`,
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
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

  return (
    <ToastProvider>
      <div className="w-full max-w-lg mx-auto mt-10">
        <Tabs defaultValue="companyLogin" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="companyLogin">Company Login</TabsTrigger>
            <TabsTrigger value="supplierLogin">Supplier Login</TabsTrigger>
            <TabsTrigger value="rootUserLogin">Root User Login</TabsTrigger>
          </TabsList>

          {/* Company Login */}
          <TabsContent value="companyLogin">
            <Card>
              <CardHeader>
                <CardTitle>Company Login</CardTitle>
                <CardDescription>
                  Login with your company account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Dropdown for role selection */}
                <div className="space-y-1">
                  <Label htmlFor="role">Select Role</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{role || "Select Role"}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setRole("Admin")}>
                        Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRole("Employee")}>
                        Employee
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    if (role) {
                      handleLogin(role); // Pass the selected role to login
                    } else {
                      toast({
                        title: "Error",
                        description: "Please select a role",
                        variant: "destructive",
                        action: (
                          <ToastAction altText="Try again">Undo</ToastAction>
                        ),
                      });
                    }
                  }}
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Supplier Login */}
          <TabsContent value="supplierLogin">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Login</CardTitle>
                <CardDescription>
                  Login with your supplier account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleLogin("Supplier")}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Root User Login */}
          <TabsContent value="rootUserLogin">
            <Card>
              <CardHeader>
                <CardTitle>Root User Login</CardTitle>
                <CardDescription>
                  Login with your root user account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleLogin("Root")}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Toast notifications */}
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default Login;
