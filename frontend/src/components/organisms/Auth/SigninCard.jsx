import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const SigninCard = ({
  signinForm,
  setSigninForm,
  onSigninFormSubmit,
  validationError,
  error,
  isSuccess,
 isPending
}) => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to access your account</CardDescription>
        {validationError && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm  text-destructive mb-6">
            <TriangleAlert className="size-5" />
            <p>{validationError.message}</p>
          </div>
        )}
        {error && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm  text-destructive mb-6">
            <TriangleAlert className="size-5" />
            <p>{error.message}</p>
          </div>
        )}
        {isSuccess && (
          <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary">
            <FaCheck className="size-5" />
            <p>Successfully signin</p>
            <LucideLoader2 className="animate-spin ml-2" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={onSigninFormSubmit}>
          <Input
            placeholder="Email"
            required
            onChange={(e) =>
              setSigninForm({ ...signinForm, email: e.target.value })
            }
            value={signinForm.email}
            type="email"
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            required
            onChange={(e) =>
              setSigninForm({ ...signinForm, password: e.target.value })
            }
            value={signinForm.password}
            type="password"
            disabled={isPending}
          />

          <Button disabled={false} size="lg" type="submit" className="w-full">
            Continue
          </Button>
        </form>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Don't have an account
          {"             "}{" "}
          <Link
            to="/auth/signup"
            className="text-sky-400 hover:underline cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SigninCard;
