"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export const PHProvider = ({ children }) => {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            person_profiles: "identified_only",
            capture_pageview: false,
        })
    }, []);

    return <PostHogProvider client={posthog}> {children} </PostHogProvider>
}