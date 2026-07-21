// Uma virada só pro site inteiro: acima de 1024px é a experiência de palco
// (rail fixa + voo do hero + pins); abaixo é o celular (hambúrguer + as seções
// revelando conforme rola). Mesmo número no CSS (lg do Tailwind) e no JS, pra
// layout e animação nunca discordarem.
export const DESKTOP = "(min-width: 1024px)";
export const MOBILE = "(max-width: 1023px)";
export const REDUCE = "(prefers-reduced-motion: reduce)";
export const NO_REDUCE = "(prefers-reduced-motion: no-preference)";

// Palco completo: desktop com movimento liberado.
export const STAGE = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
// Revelações do celular: touch/estreito com movimento liberado.
export const MOBILE_MOTION = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";
// Mouse de verdade (holofote, parallax): independe da largura do palco.
export const PLAY = "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
