import LoginPage from "@/features/LoginPage";

const Login = () => {
  return <LoginPage />;
};

Login.getLayout = (page: React.ReactNode) => page; // Header, Template 제거

export default Login;
