"use client";

import { useEffect, useState } from "react";


export default function Table() {
    const [posts, setPosts] = useState<null | []>(null);

    const handleSubmit = async () => {
        const rawResponse = await fetch("/api/list", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const content = await rawResponse.json();

        setPosts(content.posts)
    };

    useEffect(() => {
        handleSubmit()
    }, [])


    return (
        <>
            <center><h3>Lista del excel</h3></center>
            <table >
                <tbody>
                    {posts && posts.map((item: any, i: any) => {
                        return (
                            (i == 0) ?
                                <tr key={item[0]}>
                                    <th>{item[0]}</th>
                                    <th>{item[1]}</th>
                                </tr> :
                                <tr key={item[0]}>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                </tr>
                        )
                    })}

                </tbody>
            </table>
            <br />
            <button onClick={handleSubmit}>Refrescar resultados</button>
        </>
    );
};
