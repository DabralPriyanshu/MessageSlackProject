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
 import {FaCheck} from "react-icons/fa"

const SignupCard = ({
  signupForm,
  setSignupForm,
  validationError,
  onSignupFormSubmit,
  error,
  isSuccess,
  isPending,
}) => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>
          <h1>Sign Up</h1>
        </CardTitle>
        <CardDescription>Sign up to access your account</CardDescription>
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
            <p>Successfully signed up</p>
            <LucideLoader2 className="animate-spin ml-2" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={onSignupFormSubmit}>
          <Input
            placeholder="Email"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
            value={signupForm.email}
            type="email"
            disabled={isPending}
          />
          <Input
            placeholder=" Your username"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, username: e.target.value })
            }
            value={signupForm.username}
            type="text"
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            value={signupForm.password}
            type="password"
            disabled={isPending}
          />
          <Input
            placeholder="Confirm Password"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, confirmPassword: e.target.value })
            }
            value={signupForm.confirmPassword}
            type="password"
            disabled={isPending}
          />
          <Button disabled={false} size="lg" type="submit" className="w-full">
            Continue
          </Button>
        </form>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Already have an account?
          {"             "}{" "}
          <Link
            to="/auth/signin"
            className="text-sky-400 hover:underline cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignupCard;
