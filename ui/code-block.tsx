"use client";

import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

type Props = {
	code: string;
	language?: string;
	filename?: string;
};

const CodeBlock = ({ code, language = "text", filename }: Props) => {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="my-6 overflow-hidden rounded-lg border border-neutral-800 bg-[#1e1e1e] text-[13px]">
			<div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2 text-xs text-neutral-400">
				<span className="font-mono">{filename || language}</span>
				<button
					onClick={copy}
					className="rounded px-2 py-0.5 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
				>
					{copied ? "Copied" : "Copy"}
				</button>
			</div>
			<Highlight code={code.trimEnd()} language={language} theme={themes.vsDark}>
				{({ style, tokens, getLineProps, getTokenProps }) => (
					<pre
						className="overflow-x-auto p-4 font-mono leading-relaxed"
						style={{ ...style, background: "transparent" }}
					>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</div>
	);
};

export default CodeBlock;
