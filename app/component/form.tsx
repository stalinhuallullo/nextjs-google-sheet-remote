"use client"; 

import type { NextComponentType } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Form: NextComponentType = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let form = {
            name,
            age,
        };

        const rawResponse = await fetch("/api/submit", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const content = await rawResponse.json();

        // print to screen
        console.log("content ==> ", content)
        router.refresh();

        // Reset the form fields
        setName("");
        setAge("");

    };

    return (
        <>
            <form className="mt-15" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="sr-only">
                        Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="nama"
                        id="nama"
                        placeholder="Write here"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="sr-only">
                        Age
                    </label>
                    <input
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        type="text"
                        name="nama"
                        id="nama"
                        placeholder="Write here"
                    />
                </div>

                <div className="form-group">
                    <button
                        type="submit"
                        className="flex items-center justify-center text-sm w-64 rounded-md shadow py-3 px-2 text-white bg-indigo-600"
                    >
                        Send
                    </button>
                </div>
            </form>
        </>
    );
};

export default Form;
