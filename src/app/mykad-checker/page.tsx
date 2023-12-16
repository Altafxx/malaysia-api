"use client"
import Terminal from "@/components/terminal"

const handleSubmit = async (event: any) => {
    event.preventDefault();

    const malaysianIdElement = document.getElementById('malaysianId')! as HTMLInputElement;
    const malaysianId = malaysianIdElement.value;
    const responseContainer = document.getElementById('responseContainer');
    if (!malaysianId || !responseContainer) {
        console.error("Malaysian ID input or response container not found");
        return null;
    }

    responseContainer.innerHTML = '';

    const idFormatRegex = /^\d{12}$/;
    if (!idFormatRegex.test(malaysianId) || !malaysianId) {
        responseContainer.innerHTML = "Invalid Malaysian ID format. Please enter a 12-digit number.";
        return null;
    }

    try {
        const res = await fetch(`/api/mykad-checker?id=${malaysianId}`);
        if (!res.ok) {
            const errorResponse = await res.json();
            responseContainer.innerHTML = JSON.stringify(errorResponse);
            return null;
        }

        const successResponse = await res.json();

        const formattedResponse = `
            <p><b>Birth Date:</b> ${new Date(successResponse.birthDate).toLocaleDateString()}</p>
            <p><b>Birth Place:</b> ${successResponse.birthPlace.state}, ${successResponse.birthPlace.country}</p>
            <p><b>Gender:</b> ${successResponse.gender.charAt(0).toUpperCase()}${successResponse.gender.slice(1)}</p>
        `;

        responseContainer.innerHTML = formattedResponse;
    } catch (error) {
        console.error("An error occurred:", error);
        responseContainer.innerHTML = "An error occurred while processing the request.";
    }

    return null;
};



export default function MyKadChecker() {
    return (
        <div className="text-center">
            <h1>MyKad Checker</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center py-4">
                <label htmlFor="malaysianId">Malaysian ID Card Number:</label>
                <input type="text" id="malaysianId" name="malaysianId" placeholder="12 digit number" maxLength={14} className="rounded px-3 py-1 text-black" />
                <button type="submit" className="px-3 py-1 rounded-lg bg-purple-700 active:bg-purple-900">Check</button>
            </form>
            <div id="responseContainer" className="mt-4"></div>
        </div>
    );
}
