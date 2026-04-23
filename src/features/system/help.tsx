export const Help = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">How we can help you?</h1>
        <p className="text-sm text-muted-foreground">Search our knowledge base or browse categories below</p>
      </div>

      <div>
        <h2>Browse by category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-bold">Design Tokens</h3>
          </div>
        </div>
      </div>

      <div>
        <h2>Frequently asked questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-bold">Design Tokens</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
