import { spawn, SpawnOptions } from "child_process";

export const execCommand = (cmd: string, options?: SpawnOptions) =>
  new Promise<string>((resolve, reject) => {
    const child = spawn(cmd, { shell: true, stdio: "pipe", ...options });
    let output = "";
    let error = "";

    // 捕获 stdout 数据
    child.stdout?.on("data", (data) => {
      console.log(data.toString());
      output += data.toString();
    });
    child.stderr?.on("data", (data) => {
      console.error(data.toString());
      error += data.toString();
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
