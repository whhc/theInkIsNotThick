import { Logger } from '@nestjs/common';
import * as fs from 'fs';

export const writeLog = (message: string) => {
  const filename = `./logs/logger-${new Date().toISOString().slice(0, 10)}.log`;
  fs.writeFileSync(filename, `${new Date().toLocaleString()}\r${message}\r\n`, {
    flag: 'a+',
  });
};

export class CustomerLogger extends Logger {
  error(message: string, trace: string) {
    super.error(message, trace);
    writeLog(message);
  }
}
