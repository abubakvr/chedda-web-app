"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/common";
import { useLocalStorageGet } from "@/hooks";
import { usePathname } from "next/navigation";

export const WelcomeModal = () => {
  const userAcceptance = useLocalStorageGet("userAcceptance");
  const pathname = usePathname();

  const openModal =
    (!userAcceptance || userAcceptance !== "accepted") &&
    !pathname.startsWith("/restricted");

  const [checkboxes, setCheckboxes] = useState({
    terms: false,
    funds: false,
    risk: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if all checkboxes are checked
  const allChecked = checkboxes.terms && checkboxes.funds && checkboxes.risk;

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAcceptTerms = () => {
    if (allChecked) {
      localStorage.setItem("userAcceptance", JSON.stringify("accepted"));
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    setIsModalOpen(openModal);
  }, [openModal]);

  return (
    <div
      data-testid="welcomeModal"
      className={`fixed inset-0 transition-all duration-500 ${
        isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="app-modal p-6 md:p-8 rounded shadow-lg w-11/12 max-w-[320px] sm:max-w-[330px] md:max-w-[450px] lg:max-w-[550px] text-white">
          <h1 className="flex justify-center text-lg md:text-2xl lg:text-3xl font-bold">
            Welcome to CHEDDA
          </h1>
          <div>
            <p className="text-2xs md:text-sm lg:text-[18px] mt-4 md:mt-6 lg:mt-8 terms-text">
              Chedda is a decentralized, non-custodial lending protocol.
            </p>
            <p className="text-2xs md:text-sm lg:text-[18px] mt-4 md:mt-6 lg:mt-8 terms-text">
              By accessing the Chedda website, you agree to the{" "}
              <a
                href="https://www.chedda.finance/terms"
                target="_blank"
                rel="noreferrer"
                className="underline relative text-[#C142F0] hover:opacity-80"
              >
                Terms of Service.
              </a>
            </p>
          </div>
          <div>
            <div className="flex gap-x-4 items-center mt-4 md:mt-6 lg:mt-8">
              <label className="custom-checkbox lg:mt-1 w-4 h-4 lg:w-6 lg:h-6">
                <input
                  type="checkbox"
                  name="terms"
                  checked={checkboxes.terms}
                  onChange={handleCheckboxChange}
                  className="hidden"
                  data-testid="terms-checkbox"
                />
                <span className="checkmark w-4 h-4 lg:w-6 lg:h-6"></span>
              </label>
              <p className="text-3xs md:text-xs lg:text-lg font-bold terms-text">
                I have read, understood, and agree to the terms and conditions.
              </p>
            </div>
            <div className="flex gap-x-4 items-center mt-4 md:mt-6 lg:mt-8">
              <label className="custom-checkbox lg:mt-1 w-4 h-4 lg:w-6 lg:h-6">
                <input
                  type="checkbox"
                  name="funds"
                  checked={checkboxes.funds}
                  onChange={handleCheckboxChange}
                  className="hidden"
                  data-testid="funds-checkbox"
                />
                <span className="checkmark w-4 h-4 lg:w-6 lg:h-6"></span>
              </label>
              <p className="text-3xs md:text-xs lg:text-lg font-bold terms-text">
                I confirm that the funds I am using are not involved in any
                illicit activities.
              </p>
            </div>
            <div className="flex gap-x-4 items-center mt-4 md:mt-6 lg:mt-8">
              <label className="custom-checkbox lg:mt-1 w-4 h-4 lg:w-6 lg:h-6">
                <input
                  type="checkbox"
                  name="risk"
                  checked={checkboxes.risk}
                  onChange={handleCheckboxChange}
                  className="hidden"
                  data-testid="risk-checkbox"
                />
                <span className="checkmark w-4 h-4 lg:w-6 lg:h-6"></span>
              </label>
              <p className="text-3xs md:text-xs lg:text-lg font-bold terms-text">
                I acknowledge that there is a risk of losing assets and I agree
                to proceed at my own discretion.
              </p>
            </div>
          </div>
          <Button
            type="primary"
            size="large"
            className="mt-4 md:mt-6 lg:mt-8"
            onClick={handleAcceptTerms}
            disabled={!allChecked}
            ignoreChecks={true}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};
