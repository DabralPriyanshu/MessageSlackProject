//layout for auth related pages
const Auth = ({ children }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-[#020617] via-[#0f172a] to-[#1e293b]">
      <div className="md:h-auto md:w-[420px] drop-shadow-2xl">{children}</div>
    </div>
  );
};

export default Auth;
