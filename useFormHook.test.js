//import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
//import axios from "axios";
import { renderHook, act, WaitOptions } from "@testing-library/react-hooks";
import useFrom from "./TestingHook_28Aug2020.js";

// import App from "./App";
//jest.mock("axios");
afterEach(cleanup);
test("Set Intitial Empty Form", async () => {
    let { result } = renderHook(() => {
        return useFrom();
    });

    expect(JSON.stringify(result.current.values)).toBe(JSON.stringify({}));
    expect(JSON.stringify(result.current.errors)).toBe(JSON.stringify({}));
    expect(result.current.isFormValid).toBe(true);
});

test("Set Intitial Form With Data", async () => {

    const initialValues = {
        email: 'foo@bar.com',
        name: 'John Smith'
    }
    const isValid = {
        email: false,
        name: false,
    }
    let { result } = renderHook(() => {
        return useFrom(initialValues);
    });

    expect(JSON.stringify(result.current.values)).toBe(JSON.stringify(initialValues));
    expect(JSON.stringify(result.current.errors)).toBe(JSON.stringify({}));
    expect(JSON.stringify(result.current.isValid)).toBe(JSON.stringify(isValid));
    expect(result.current.isFormValid).toBe(false);
});

test("Set Intitial Form With Data and isValid values", async () => {

    const initialValues = {
        email: 'foo@bar.com',
        name: 'John Smith'
    }
    const isValid = {
        email: true,
        name: false,
    }
    let { result } = renderHook(() => {
        return useFrom(initialValues, isValid);
    });

    expect(JSON.stringify(result.current.values)).toBe(JSON.stringify(initialValues));
    expect(JSON.stringify(result.current.errors)).toBe(JSON.stringify({}));
    expect(JSON.stringify(result.current.isValid)).toBe(JSON.stringify(isValid));
    expect(result.current.isFormValid).toBe(false);
});

test("Set Intitial Form With Data and isValid values", async () => {

    const initialValues = {
        email: 'foo@bar.com',
        name: 'John Smith'
    }
    const isValid = {
        email: true,
        name: true,
    }
    let { result } = renderHook(() => {
        return useFrom(initialValues, isValid);
    });

    expect(JSON.stringify(result.current.values)).toBe(JSON.stringify(initialValues));
    expect(JSON.stringify(result.current.errors)).toBe(JSON.stringify({}));
    expect(JSON.stringify(result.current.isValid)).toBe(JSON.stringify(isValid));
    expect(result.current.isFormValid).toBe(true);
});

test("Call HandleChange Values", async () => {

    const initialValues = {
        email: 'foo@bar.com',
        name: ''
    }
    const isValid = {
        email: true,
        name: false,
    }

    const event = {
        target: {
            name: 'name',
            value: 'Updated Name',
            getAttribute: () => {
                return null;
            }
        },
        type: 'change'
    }
    let { result } = renderHook(() => {
        return useFrom(initialValues, isValid);
    });

    //Before Act intitial values.
    expect(result.current.values.name).toBe(initialValues.name);
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(isValid.name);
    expect(result.current.isFormValid).toBe(false);

    act(() => {
        result.current.handleInputChange(event)
    });

    //After Firing name input change Event.
    expect(result.current.values.name).toBe(event.target.value);
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(true);
    expect(result.current.isFormValid).toBe(true);
});

test("Call HandleChange Values", async () => {

    const initialValues = {
        email: 'foo@bar.com',
        name: ''
    }
    const isValid = {
        email: true,
        name: false,
    }

    const event = {
        target: {
            name: 'name',
            value: 'John123',
            getAttribute: () => {
                return '[0-9]';
            }
        },
        type: 'change'
    }
    let { result } = renderHook(() => {
        return useFrom(initialValues, isValid);
    });

    //Before Act intitial values.
    expect(result.current.values.name).toBe(initialValues.name);
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(isValid.name);
    expect(result.current.isFormValid).toBe(false);

    act(() => {
        result.current.handleInputChange(event)
    });

    //After Firing name input change Event.
    expect(result.current.values.name).toBe('John');
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(true);
    expect(result.current.isFormValid).toBe(true);
});

test("Call HandleChange Values & Remove Unwanted Char", async () => {

    const initialValues = {
        email: 'foo@bar.com',
        name: ''
    }
    const isValid = {
        email: true,
        name: false,
    }

    const event = {
        target: {
            name: 'name',
            value: 'John123',
            getAttribute: () => {
                return '[0-9]';
            }
        },
        type: 'change'
    }

    let { result } = renderHook(() => {
        return useFrom(initialValues, isValid);
    });

    //Before Act intitial values.
    expect(result.current.values.name).toBe(initialValues.name);
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(isValid.name);
    expect(result.current.isFormValid).toBe(false);

    act(() => {
        result.current.handleInputChange(event)
    });
    //After Firing name input change Event.
    expect(result.current.values.name).toBe('John');
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(true);
    expect(result.current.isFormValid).toBe(true);
});

test("Call HandleChange Values & Validate With Regex", async () => {

    const initialValues = {
        email: '',
    }
    const isValid = {
        email: false,
    }

    let event = {
        target: {
            name: 'email',
            value: 'foobar',
            pattern: '[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}',
            getAttribute: () => {
                return null;
            }
        },
        type: 'blur'
    }
    let { result } = renderHook(() => {
        return useFrom(initialValues, isValid);
    });

    //Before Act intitial values.
    expect(result.current.values.email).toBe(initialValues.email);
    expect(result.current.errors.email).toBe(undefined);
    expect(result.current.isValid.email).toBe(isValid.email);
    expect(result.current.isFormValid).toBe(false);

    act(() => {
        result.current.handleInputChange(event)
    });

    //After Firing name input change Event.
    expect(result.current.values.email).toBe(event.target.value);
    expect(result.current.errors.email).toBe(true);
    expect(result.current.isValid.email).toBe(false);
    expect(result.current.isFormValid).toBe(false);

    event.target.value = 'foo@bar.com';

    act(() => {
        result.current.handleInputChange(event)
    });
    console.log("result: ", result.current);

    //After Firing name input change Event.
    expect(result.current.values.email).toBe(event.target.value);
    expect(result.current.errors.email).toBe(undefined);
    expect(result.current.isValid.email).toBe(true);
    expect(result.current.isFormValid).toBe(true);
});

test("Call HandleChange Values & Submit Event", async () => {

    const initialValues = {
        email: 'foo@bar.com',
        name: ''
    }
    const isValid = {
        email: true,
        name: false,
    }

    const event = {
        target: {
            name: 'name',
            value: 'John123',
            getAttribute: () => {
                return '[0-9]';
            }
        },
        type: 'change',
        preventDefault : () => {},
    }
    let { result } = renderHook(() => {
        return useFrom(initialValues, isValid);
    });

    //Before Act intitial values.
    expect(result.current.values.name).toBe(initialValues.name);
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(isValid.name);
    expect(result.current.isFormValid).toBe(false);

    let isFormSubmitted = false;
    await act( async () => {
        result.current.formSubmit(event, () => {
            isFormSubmitted = true;
        })
    });

    expect(isFormSubmitted).toBe(false);

    act(() => {
        result.current.handleInputChange(event)
    });

    //After Firing name input change Event.
    expect(result.current.values.name).toBe('John');
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(true);
    expect(result.current.isFormValid).toBe(true);

    await act( async () => {
        result.current.formSubmit(event, () => {
            isFormSubmitted = true;
        })
    });

    expect(isFormSubmitted).toBe(true);
});

test("Call HandleChange Values & Submit Event null event and custom callback", async () => {

    const initialValues = {
        email: 'foo@bar.com',
        name: ''
    }
    const isValid = {
        email: true,
        name: false,
    }

    const event = {
        target: {
            name: 'name',
            value: 'John123',
            getAttribute: () => {
                return '[0-9]';
            }
        },
        type: 'change',
        preventDefault : () => {},
    }
    let { result } = renderHook(() => {
        return useFrom(initialValues, isValid);
    });

    //Before Act intitial values.
    expect(result.current.values.name).toBe(initialValues.name);
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(isValid.name);
    expect(result.current.isFormValid).toBe(false);

    let isFormSubmitted = false;
    await act( async () => {
        result.current.formSubmit(event, () => {
            isFormSubmitted = true;
        })
    });

    expect(isFormSubmitted).toBe(false);

    act(() => {
        result.current.handleInputChange(event)
    });

    //After Firing name input change Event.
    expect(result.current.values.name).toBe('John');
    expect(result.current.errors.name).toBe(undefined);
    expect(result.current.isValid.name).toBe(true);
    expect(result.current.isFormValid).toBe(true);

    await act( async () => {
        result.current.formSubmit(null, null);
    });

    expect(isFormSubmitted).toBe(false);
});