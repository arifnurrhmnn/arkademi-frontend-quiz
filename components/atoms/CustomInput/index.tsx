import React, { useRef } from "react";

interface CustomInputProps {
  className?: string;
  placeholder: string;
  textContent: string;
  setTextContent: (e: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  className,
  placeholder,
  textContent,
  setTextContent,
}) => {
  const divRef = useRef(null);

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    textContent === placeholder
      ? setTextContent("")
      : setTextContent(e.currentTarget.textContent || "");
  };

  const handleInput = (e: React.FocusEvent<HTMLDivElement>) => {
    setTextContent(e.currentTarget.textContent || "");
    moveCaretToEnd();
  };

  const handleBlur = () => {
    textContent === "" && setTextContent(placeholder);
  };

  const moveCaretToEnd = () => {
    const el = divRef.current;
    if (!el) return;

    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false); // Pindahkan kursor ke akhir teks
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const styles = className
    ? className
    : "font-bold text-white text-4xl text-center border-2 border-dashed rounded-lg outline-none p-4";

  return (
    <div
      ref={divRef}
      contentEditable
      suppressContentEditableWarning
      onFocus={handleFocus}
      onInput={handleInput}
      onBlur={handleBlur}
      className={`w-full min-[auto] outline-none ${styles} ${
        textContent === placeholder && "text-gray-400"
      }`}
    >
      {textContent}
    </div>
  );
};

export default CustomInput;
