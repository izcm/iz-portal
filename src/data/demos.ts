// https://devicon.dev/
export const iconPaths = {
  links: "icons/links/",
};

export type DemoIds =
  | "dmrkt"
  | "marketplace-simulation"
  | "nft-indexer"
  | "trading-terminal"
  | "miniNFT";

export type Tool = {
  name: string;
  devicon?: string;
};

const tools = {
  react: { name: "React", devicon: "react" },
  nextjs: { name: "Next.js", devicon: "nextjs" },
  node: { name: "Node.js", devicon: "nodejs" },
  fastify: { name: "Fastify", devicon: "fastify" },
  mongo: { name: "MongoDB", devicon: "mongodb" },
  foundry: { name: "Foundry" },
  viem: { name: "Viem" },
  wagmi: { name: "Wagmi" },
  docker: { name: "Docker", devicon: "docker" },
  solidity: { name: "Solidity", devicon: "solidity" },
  tailwind: { name: "Tailwind", devicon: "tailwindcss" },
  yul: { name: "Yul" },
} as const;

const toolOrder: Record<string, number> = {
  "Next.js": 1,
  "Node.js": 2,
  MongoDB: 3,
  Docker: 4,
  Fastify: 5,
  Solidity: 6,
};

export const sortTools = (t: Tool[]): Tool[] => {
  const known = t
    .filter((x) => toolOrder[x.name] !== undefined)
    .sort((a, b) => toolOrder[a.name] - toolOrder[b.name]);
  const unknown = t
    .filter((x) => toolOrder[x.name] === undefined)
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...known, ...unknown];
};

export type DemoBase = {
  id: string;
  title: string;
  desc: string;
  repoLink: string;
  composedOf?: DemoIds[];
  tools: Tool[];
};

export type Demo =
  | (DemoBase & { isLive: true; liveUrl: string })
  | (DemoBase & { isLive?: false; liveUrl?: never });

const marketplaceSimulation: DemoBase = {
  id: "marketplace-simulation",
  title: "Marketplace Simulation",
  desc: `A deterministic trading simulator built with Foundry, Bash, and TypeScript.
      It deploys contracts, derives a flexible set of accounts from a mnemonic, then impersonates them to sign EIP-712 orders and execute trades on-chain.
Runs on a local Anvil fork with replayed activity, or directly on Sepolia.`,
  repoLink: "https://github.com/izcm/market-sim",
  tools: [tools.solidity, tools.foundry, tools.viem],
};

const nftIndexer: DemoBase = {
  id: "nft-indexer",
  title: "NFT Indexer",
  desc: `Node.js service that subscribes to blockchain events, parses emitted logs, and persists them to MongoDB.
      Background workers enrich indexed data and poll from chain to backfill NFT mints.
      The service also exposes an HTTP API for submitting EIP-712 orders along with endpoints for querying indexed data.
      There is also a minimal websocket API for realtime updates.`,
  repoLink: "https://github.com/izcm/nft-indexer",
  tools: [tools.node, tools.mongo, tools.viem, tools.fastify],
};

const tradingTerminal: DemoBase = {
  id: "trading-terminal",
  title: "Trading Terminal",
  desc: `Next.js trading terminal with wallet connectivity, live order flow, and realtime blockchain updates. 
      The application is keyboard-first and multi-themed. `,
  repoLink: "https://github.com/izcm/trading-terminal",
  tools: [tools.nextjs, tools.wagmi, tools.viem, tools.tailwind],
};

const miniNFT: DemoBase = {
  id: "miniNFT",
  title: "MiniNFT",
  desc: `Educational NFT implemented in Yul to explore the EVM at the opcode level.
      Not ERC-721 compliant by design, featuring bit-packed storage, custom errors, and on-chain SVGs.`,
  repoLink: "https://github.com/izcm/yul-miniNFT",
  tools: [tools.solidity, tools.foundry, tools.yul],
};

const dedupeTools = (t: Tool[]): Tool[] => [
  ...new Map(t.map((tool) => [tool.name, tool])).values(),
];

export const demos: Demo[] = [
  {
    id: "dmrkt",
    title: "d | mrkt – A deterministic marketplace simulation",
    desc: `End-to-end NFT marketplace and chain-activity simulation.
      Provides a reproducible Web3 sandbox that's fully containerized and spins up in a single command.
      A live deployment is available on Sepolia.`,
    repoLink: "https://github.com/izcm/dmrkt-demo",
    composedOf: ["marketplace-simulation", "nft-indexer", "trading-terminal"],
    tools: dedupeTools([
      ...marketplaceSimulation.tools,
      ...nftIndexer.tools,
      ...tradingTerminal.tools,
    ]),
    isLive: true,
    liveUrl: "https://dmrkt.izblocks.com",
  },
  marketplaceSimulation,
  nftIndexer,
  tradingTerminal,
  miniNFT,
];
