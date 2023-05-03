export const BeautifyNumber = (number: number): string =>
  number < 10 ? '0' + number : number.toString();

class Buffer {
  private cursor: number;
  private size: number;
  private data: Uint8Array | null | any;

  constructor() {
    this.cursor = 0;
    this.size = 0;
    this.data = null;
  }

  public finished(): boolean {
    return this.cursor >= this.size;
  }

  public getByte(): number | undefined {
    return this.data && this.data[this.cursor++];
  }

  public move(length: number): number {
    const start = this.cursor;
    this.cursor = this.cursor + length > this.size ? this.size : this.cursor + length;
    const end = this.cursor;
    return end - start;
  }

  public setData(data: Uint8Array): void {
    this.size = data.length;
    this.data = data;
    this.cursor = 0;
  }
}

export default Buffer;
