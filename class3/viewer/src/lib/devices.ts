/* the three device frames of the preview (the same sizes as the Tool_Pipeline preview): the tool is mounted in an iframe of
 * exactly this many CSS px and the frame is scaled down to fit the stage, so a tool lays out as it will on that device */
export const DEVICES = {
  mobile: { label: "Mobile", w: 844, h: 390 },
  web: { label: "Web", w: 1366, h: 768 },
  smartboard: { label: "Smartboard", w: 1920, h: 1080 },
} as const;

export type Device = keyof typeof DEVICES;
export const DEVICE_ORDER: Device[] = ["mobile", "web", "smartboard"];
