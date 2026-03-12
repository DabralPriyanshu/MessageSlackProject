import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // install lucide-react if not installed

const Notfound = () => {
  return (
    // Main container with gradient background and subtle animation
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4 animate-fade-in">
      {/* 404 text decoration in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.02] pointer-events-none">
        <h1 className="text-[20rem] font-extrabold text-gray-950">404</h1>
      </div>

      <Card className="text-center shadow-2xl max-w-lg w-full border-none bg-white/90 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.01]">
        <CardHeader className="pt-10 pb-6">
          {/* Status badge */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-inner">
            <span className="text-4xl font-bold">!</span>
          </div>

          <CardTitle className="text-4xl font-extrabold tracking-tight text-gray-900">
            Page Not Found
          </CardTitle>
          <p className="text-xl text-gray-600 mt-3 max-w-sm mx-auto">
            Oops! The page you are looking for does not exist or has been moved.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center pb-10">
          {/* Styled Image Container */}
          <div className="relative group mb-8 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
            <img
              src="data:image/png;base64,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"
              alt="404 Illustration"
              className="max-h-60 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent group-hover:from-gray-900/20 transition-all duration-300"></div>
          </div>

          <Link to="/">
            <Button
              className="mt-4 px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-cyan-100 transition-all duration-300 transform hover:-translate-y-1"
              variant="default" // You can change this to "cyan" or your primary color
            >
              <ArrowLeft className="mr-2 h-5 w-5 animate-pulse" /> Go Back to
              Safety
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Tailwind config to add the fade-in animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Notfound;
