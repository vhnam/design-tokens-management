import AccountProfileInformation from './account-profile-information';

export const Account = () => {
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Account</h1>
          <p className="text-sm text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <AccountProfileInformation />
    </div>
  );
};
