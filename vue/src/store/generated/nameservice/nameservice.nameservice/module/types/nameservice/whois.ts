/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nameservice.nameservice";

export interface Whois {
  name: string;
  owner: string;
  price: string;
  minbid: string;
}

const baseWhois: object = { name: "", owner: "", price: "", minbid: "" };

export const Whois = {
  encode(message: Whois, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.price !== "") {
      writer.uint32(34).string(message.price);
    }
    if (message.minbid !== "") {
      writer.uint32(42).string(message.minbid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Whois {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWhois } as Whois;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 3:
          message.owner = reader.string();
          break;
        case 4:
          message.price = reader.string();
          break;
        case 5:
          message.minbid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Whois {
    const message = { ...baseWhois } as Whois;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = String(object.price);
    } else {
      message.price = "";
    }
    if (object.minbid !== undefined && object.minbid !== null) {
      message.minbid = String(object.minbid);
    } else {
      message.minbid = "";
    }
    return message;
  },

  toJSON(message: Whois): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined && (obj.owner = message.owner);
    message.price !== undefined && (obj.price = message.price);
    message.minbid !== undefined && (obj.minbid = message.minbid);
    return obj;
  },

  fromPartial(object: DeepPartial<Whois>): Whois {
    const message = { ...baseWhois } as Whois;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    } else {
      message.price = "";
    }
    if (object.minbid !== undefined && object.minbid !== null) {
      message.minbid = object.minbid;
    } else {
      message.minbid = "";
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
