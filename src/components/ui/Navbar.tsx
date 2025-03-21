import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export interface NavbarProps {
  title?: string;
}

export function Navbar({ title = "Vigilance" }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="font-bold text-xl"
            >
              {title}
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}  
            >
              Home
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}  
            >
              Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
