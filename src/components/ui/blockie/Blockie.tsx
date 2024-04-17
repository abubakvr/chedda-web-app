import Blockies from "react-blockies";

export const Blockie = ({
  accountAddress = "newUser",
  size,
}: {
  accountAddress?: string;
  size?: number;
}) => (
  <div data-testid="blockie">
    <Blockies
      seed={accountAddress}
      size={size ? size : 9}
      scale={3}
      color="#5DDEFA"
      className="identicon rounded-full border border-white flex items-center self-center"
    />
  </div>
);
