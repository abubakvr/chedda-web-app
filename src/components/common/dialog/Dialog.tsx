export const Dialog = ({
  isOpen,
  title,
  message,
  actionTitle,
  buttonAction,
  onClose,
}: {
  title: string;
  isOpen: boolean;
  message: string;
  actionTitle: string;
  onClose: () => void;
  buttonAction: () => void;
}) => {
  return (
    <>
      <div
        data-testid="dialog-container"
        className={`fixed inset-0 ${
          isOpen ? "block overflow-hidden" : "hidden"
        } bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="app-modal p-8 rounded shadow-lg w-[500px]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold" data-testid="dialog-title">
                {title}!
              </h2>
            </div>
            <div className="mt-6 rounded-lg p-2">
              <div className="text-[18px] font-normal">{message}</div>
              <div className="flex justify-end text-xl gap-x-10 mt-10 relative">
                <button
                  onClick={onClose}
                  className="uppercase font-bold text-[#DEDEDE] hover:opacity-70"
                >
                  Cancel
                </button>
                <button
                  onClick={buttonAction}
                  className="uppercase font-bold manage-gradient-text hover:opacity-70"
                >
                  {actionTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
