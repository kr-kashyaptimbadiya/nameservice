/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../nameservice/params";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { Whois } from "../nameservice/whois";

export const protobufPackage = "nameservice.nameservice";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryNamesRequest {
  pagination: PageRequest | undefined;
  name: string;
}

export interface QueryNamesResponse {
  whois: Whois[];
  pagination: PageResponse | undefined;
}

export interface QueryMinbidpriceRequest {
  name: string;
}

export interface QueryMinbidpriceResponse {
  name: string;
  minbidprice: string;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryNamesRequest: object = { name: "" };

export const QueryNamesRequest = {
  encode(message: QueryNamesRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryNamesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryNamesRequest } as QueryNamesRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNamesRequest {
    const message = { ...baseQueryNamesRequest } as QueryNamesRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: QueryNamesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryNamesRequest>): QueryNamesRequest {
    const message = { ...baseQueryNamesRequest } as QueryNamesRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseQueryNamesResponse: object = {};

export const QueryNamesResponse = {
  encode(
    message: QueryNamesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.whois) {
      Whois.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryNamesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryNamesResponse } as QueryNamesResponse;
    message.whois = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.whois.push(Whois.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNamesResponse {
    const message = { ...baseQueryNamesResponse } as QueryNamesResponse;
    message.whois = [];
    if (object.whois !== undefined && object.whois !== null) {
      for (const e of object.whois) {
        message.whois.push(Whois.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryNamesResponse): unknown {
    const obj: any = {};
    if (message.whois) {
      obj.whois = message.whois.map((e) => (e ? Whois.toJSON(e) : undefined));
    } else {
      obj.whois = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryNamesResponse>): QueryNamesResponse {
    const message = { ...baseQueryNamesResponse } as QueryNamesResponse;
    message.whois = [];
    if (object.whois !== undefined && object.whois !== null) {
      for (const e of object.whois) {
        message.whois.push(Whois.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryMinbidpriceRequest: object = { name: "" };

export const QueryMinbidpriceRequest = {
  encode(
    message: QueryMinbidpriceRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryMinbidpriceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryMinbidpriceRequest,
    } as QueryMinbidpriceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMinbidpriceRequest {
    const message = {
      ...baseQueryMinbidpriceRequest,
    } as QueryMinbidpriceRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: QueryMinbidpriceRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryMinbidpriceRequest>
  ): QueryMinbidpriceRequest {
    const message = {
      ...baseQueryMinbidpriceRequest,
    } as QueryMinbidpriceRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseQueryMinbidpriceResponse: object = { name: "", minbidprice: "" };

export const QueryMinbidpriceResponse = {
  encode(
    message: QueryMinbidpriceResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.minbidprice !== "") {
      writer.uint32(18).string(message.minbidprice);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryMinbidpriceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryMinbidpriceResponse,
    } as QueryMinbidpriceResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.minbidprice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMinbidpriceResponse {
    const message = {
      ...baseQueryMinbidpriceResponse,
    } as QueryMinbidpriceResponse;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.minbidprice !== undefined && object.minbidprice !== null) {
      message.minbidprice = String(object.minbidprice);
    } else {
      message.minbidprice = "";
    }
    return message;
  },

  toJSON(message: QueryMinbidpriceResponse): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.minbidprice !== undefined &&
      (obj.minbidprice = message.minbidprice);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryMinbidpriceResponse>
  ): QueryMinbidpriceResponse {
    const message = {
      ...baseQueryMinbidpriceResponse,
    } as QueryMinbidpriceResponse;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.minbidprice !== undefined && object.minbidprice !== null) {
      message.minbidprice = object.minbidprice;
    } else {
      message.minbidprice = "";
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Names items. */
  Names(request: QueryNamesRequest): Promise<QueryNamesResponse>;
  /** Queries a list of Minbidprice items. */
  Minbidprice(
    request: QueryMinbidpriceRequest
  ): Promise<QueryMinbidpriceResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nameservice.nameservice.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  Names(request: QueryNamesRequest): Promise<QueryNamesResponse> {
    const data = QueryNamesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nameservice.nameservice.Query",
      "Names",
      data
    );
    return promise.then((data) => QueryNamesResponse.decode(new Reader(data)));
  }

  Minbidprice(
    request: QueryMinbidpriceRequest
  ): Promise<QueryMinbidpriceResponse> {
    const data = QueryMinbidpriceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nameservice.nameservice.Query",
      "Minbidprice",
      data
    );
    return promise.then((data) =>
      QueryMinbidpriceResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
