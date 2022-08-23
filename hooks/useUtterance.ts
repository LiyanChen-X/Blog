import { useInView } from 'framer-motion';
import { RefObject, useEffect, useRef, useState } from 'react';

type IUtterancesParams = {
    theme: string;
    issueTerm: string;
    repo: string;
    ref: RefObject<HTMLDivElement>;
}


const useUtterances = (params: IUtterancesParams) => {
    const { theme, issueTerm, repo, ref } = params;
    const [status, setStatus] = useState("loading");
    const isInView = useInView(ref, {
        once: true,
    })

    // in strict mode, useEffect will be called twice.
    const mounted = useRef(false);

    // TODO: handle theme change; 
    useEffect(() => {
        if (mounted.current) {
            return;
        }
        let script = document.createElement("script");
        const setAttributeStatus = (event: Event) => {
            setStatus(event.type === "load" ? "ready" : "error");
        }
        if (isInView) {
            script.src = "https://utteranc.es/client.js";
            script.crossOrigin = "anonymous";
            script.setAttribute("theme", theme);
            script.setAttribute("issue-term", issueTerm);
            script.setAttribute("repo", repo);
            ref!.current!.appendChild(script);
            mounted.current = true;

            script.addEventListener("load", setAttributeStatus);
            script.addEventListener("error", setAttributeStatus);
        }


        return () => {
            if (script) {
                script.removeEventListener("load", setAttributeStatus);
                script.removeEventListener("error", setAttributeStatus);
            }
        }
    }, [isInView]);

    useEffect(() => {
        if (mounted.current) {
            const iframe = document.querySelector('.utterances-frame') as HTMLIFrameElement;
            if (!iframe) {
                return;
            }
            iframe?.contentWindow?.postMessage({ type: 'set-theme', theme }, 'https://utteranc.es')
        }
    }, [theme]);

    return status;
}


export default useUtterances;
