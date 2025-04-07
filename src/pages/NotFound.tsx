
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-circuit-bg text-white p-6">
      <h1 className="text-4xl font-bold mb-4">404 - 页面未找到</h1>
      <p className="text-xl mb-8">您正在寻找的页面不存在。</p>
      <Link to="/">
        <Button>返回主页</Button>
      </Link>
    </div>
  );
};

export default NotFound;
