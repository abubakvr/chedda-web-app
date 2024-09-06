import { copyToClipboard } from "../copyToClipboard";

describe("copyToClipboard", () => {
  // Mock the clipboard API
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  it("should resolve successfully when writeText succeeds", async () => {
    // Arrange
    const text = "Hello, world!";
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValueOnce(
      undefined
    );

    // Act
    const result = await copyToClipboard(text);

    // Assert
    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });

  it("should reject with an error when writeText fails", async () => {
    // Arrange
    const text = "Hello, world!";
    const error = new Error("Failed to copy text");
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(error);

    // Act & Assert
    await expect(copyToClipboard(text)).rejects.toThrow(error);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });
});
