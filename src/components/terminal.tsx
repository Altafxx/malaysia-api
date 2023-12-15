"use client";
import React, { useState } from 'react';
import { Ubuntu_Mono } from 'next/font/google'

const textFont = Ubuntu_Mono({
    weight: '400',
    subsets: ['latin'],
})

export default function Terminal(props: any) {
    const [isCopied, setIsCopied] = useState(false);

    function copyText() {
        navigator.clipboard.writeText(props.text.join(' && '));
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 500);
    }

    return (
        <div className={`relative container rounded-md p-2 mb-5 mt-2 text-start ${isCopied ? 'bg-gray-800' : 'bg-purple-100/10'} flex col-auto content-between`}>
            <div className="max-w-full overflow-x-auto">
                {props.text.map((line: string, index: number) => (
                    <div className={`${isCopied ? 'text-transparent' : textFont.className} whitespace-pre-wrap mb-1`} key={index}>{line}</div>
                ))}
            </div>
            {isCopied && (
                <div className="container rounded-md p-2 mb-5 absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl bg-black bg-opacity-75 opacity-100 transition-opacity duration-100">
                    COPIED!! 🫡
                </div>
            )}
            <button
                className={`rounded-full px-3 py-1 mx-2 bg-black ml-auto max-h-8 ${isCopied ? 'opacity-50 cursor-not-allowed text-transparent bg-transparent' : ''}`}
                onClick={copyText}
                disabled={isCopied}
            >
                Copy
            </button>
        </div>
    );
}
