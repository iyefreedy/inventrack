import { useEffect, FormEventHandler, useContext, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Head, useForm } from "@inertiajs/react";
import { classNames } from "primereact/utils";
import { LayoutContext } from "@/context/LayoutContext";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import SimpleLayout from "@/Layouts/SimpleLayout";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { layoutConfig } = useContext(LayoutContext);

    const containerClassName = classNames(
        "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
        { "p-input-filled": layoutConfig.inputStyle === "filled" }
    );
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <SimpleLayout>
            <Head title="Log in" />
            <form onSubmit={submit}>
                <div className={containerClassName}>
                    <div className="flex flex-column align-items-center justify-content-center">
                        <img
                            src={`/layout/images/inventrack-logo.png`}
                            alt="Sakai logo"
                            className="mb-5 w-6rem flex-shrink-0"
                        />
                        <div
                            style={{
                                borderRadius: "56px",
                                padding: "0.3rem",
                                background:
                                    "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
                            }}
                        >
                            <div
                                className="w-full surface-card py-8 px-5 sm:px-8"
                                style={{ borderRadius: "53px" }}
                            >
                                <div className="text-center mb-5">
                                    <div className="text-900 text-3xl font-medium mb-3">
                                        Welcome to Inventrack!
                                    </div>
                                    <span className="text-600 font-medium">
                                        Sign in to continue
                                    </span>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email1"
                                        className="block text-900 text-xl font-medium mb-2"
                                    >
                                        Email
                                    </label>
                                    <InputText
                                        id="email1"
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full md:w-30rem mb-5"
                                        style={{ padding: "1rem" }}
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    <label
                                        htmlFor="password"
                                        className="block text-900 font-medium text-xl mb-2"
                                    >
                                        Password
                                    </label>
                                    <Password
                                        inputId="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Password"
                                        toggleMask
                                        className="w-full mb-5"
                                        inputClassName="w-full p-3 md:w-30rem"
                                    ></Password>

                                    <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                        <div className="flex align-items-center">
                                            <Checkbox
                                                id="remember"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData(
                                                        "remember",
                                                        e.checked ?? false
                                                    )
                                                }
                                                className="mr-2"
                                            ></Checkbox>
                                            <label htmlFor="remember">
                                                Remember me
                                            </label>
                                        </div>
                                        <a
                                            className="font-medium no-underline ml-2 text-right cursor-pointer"
                                            style={{
                                                color: "var(--primary-color)",
                                            }}
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full p-3 text-xl"
                                        label="Sign In"
                                        disabled={processing}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </SimpleLayout>
    );
}
