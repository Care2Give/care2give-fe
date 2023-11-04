import { memo, useState } from 'react';
import type { FC } from 'react';
import Modal from 'react-modal';

type Props = {
  isVisible?: boolean;
  onClose?: Function;
}

/* @figmaId 1:2 */
export const Popup = ({isVisible, onClose}: Props) => {
  if(!isVisible) return null;

  const handleClose = (element) => {
    if (element.target.id==="wrapper") onClose();
  }

  return (
    <div className='z-40 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
      <div className="w-[600px] flex flex-col">
        <div className="border border-[color:var(--grey-300,#A6A6A6)] bg-white self-stretch flex grow flex-col pb-12 px-5 rounded-2xl border-solid max-md:max-w-full">
          <button className="text-black text-xl place-self-end" onClick={() => onClose()}>X</button>
          <div className="flex-col overflow-hidden self-stretch relative flex min-h-[275px] w-full -mr-5 pl-20 pr-3 pt-3 pb-60 max-md:max-w-full max-md:pl-5 max-md:pb-24">
            <img
              loading="lazy"
              src="./popup_image.png"
              alt="Care2Give Image"
              className="aspect-square object-contain object-center w-6 overflow-hidden max-w-full -mb-12 self-end max-md:mb-2.5"
            />
          </div>

          <div className="text-black text-3xl leading-8 self-center whitespace-nowrap mt-9">
            Help by sharing
          </div>
          <div className="text-neutral-800 text-center text-base leading-5 self-center max-w-[351px] mt-2">
            Fundraisers shared on social networks raise up to 5x more.
          </div>
          <div className="justify-between items-start bg-white self-center flex w-[341px] max-w-full gap-5 mt-12 px-6 py-4 max-md:justify-center max-md:mt-10 max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/837e63de-175e-458e-9c93-11c835ade239?"
              className="aspect-square object-contain object-center w-11 fill-white overflow-hidden self-stretch max-w-full"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c281b3c3-27f4-44e5-b22a-2798af725d7b?"
              className="aspect-square object-contain object-center w-11 overflow-hidden self-stretch max-w-full"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b18f406e-ddd7-40a5-941c-7d365142e4e6?"
              className="aspect-[1.21] object-contain object-center w-[41px] stroke-[2px] stroke-blue-500 overflow-hidden self-center max-w-full my-auto"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cda5c4da-c4c9-4b09-9462-8525de23c716?"
              className="aspect-[0.53] object-contain object-center w-5 stroke-[2px] stroke-blue-500 overflow-hidden self-center max-w-full my-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
