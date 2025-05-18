import PasswordReset from "@/components/auth/PasswordReset";

const ResetPassword = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      <h2 className="mb-5">パスワードを忘れてしまった方</h2>
      <p className="mb-10">
        登録されたメールアドレスを入力してください。パスワードをリセットする通知をお送りします。
      </p>
      <PasswordReset />
    </div>
  );
};

export default ResetPassword;
