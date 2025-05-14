import Logout from "@/components/auth/Logout";
import AccountForm from "@/components/ui/AccountForm";

const Account = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      <h2 className="mb-10">ユーザープロフィール画面</h2>
      <div className="mb-10">
        <AccountForm />
      </div>
      <Logout />
    </div>
  );
};

export default Account;
