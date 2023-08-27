import { useEffect, FormEventHandler, useContext } from "react";
import { Head, useForm } from "@inertiajs/react";
import SimpleLayout from "@/Layouts/SimpleLayout";
import { classNames } from "primereact/utils";
import { LayoutContext } from "@/context/LayoutContext";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

export default function Register() {
    const { layoutConfig } = useContext(LayoutContext);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const containerClassName = classNames(
        "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
        { "p-input-filled": layoutConfig.inputStyle === "filled" }
    );

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <SimpleLayout>
            <Head title="Register" />

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
                                <div className="text-center mb-4">
                                    <div className="text-900 text-3xl font-medium mb-3">
                                        Welcome to Inventrack!
                                    </div>
                                    <span className="text-600 font-medium">
                                        Sign up to continue
                                    </span>
                                </div>

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-900 text-xl font-medium mb-2"
                                    >
                                        Name
                                    </label>
                                    <InputText
                                        id="name"
                                        type="text"
                                        placeholder="Name"
                                        className="w-full md:w-30rem mb-4"
                                        style={{ padding: "1rem" }}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />

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
                                        className="w-full md:w-30rem mb-4"
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
                                        className="w-full mb-4"
                                        inputClassName="w-full p-3 md:w-30rem"
                                    ></Password>

                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-900 font-medium text-xl mb-2"
                                    >
                                        Password Confirmation
                                    </label>
                                    <Password
                                        inputId="confirmPassword"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Password Confirmation"
                                        toggleMask
                                        className="w-full mb-4"
                                        inputClassName="w-full p-3 md:w-30rem"
                                    ></Password>

                                    <div className="flex align-items-center justify-content-between mb-5 gap-5"></div>
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
