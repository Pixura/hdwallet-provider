declare module "web3-provider-engine" {
  import EventEmitter from 'events'

  namespace Web3ProviderEngine {
    type Callback<A> = (err: Error|null|undefined, result?: A) => void

    export interface Options {
      blockTrackerProvider?: any
      blockTracker?: any
      pollingInterval?: number
    }

    interface JsonRPCRequest {
      jsonrpc: string;
      method: string;
      params: any[];
      id: number;
    }

    interface JsonRPCResponse {
      jsonrpc: string;
      id: number;
      result?: any;
      error?: string;
    }
  }

  class Web3ProviderEngine extends EventEmitter {
    constructor(opts?: Web3ProviderEngine.Options)
    addProvider(provider: any): void;
    sendAsync(payload: Web3ProviderEngine.JsonRPCRequest, callback: Web3ProviderEngine.Callback<Web3ProviderEngine.JsonRPCResponse>): void;
    start(): void;
    stop(): void;
    _handleAsync(req: any, cb: (err: any, res?: any) => void): void
    _getBlockByNumber(blockNumber: string | number, callback: (error: any, result?: any) => void): void
  }

  export = Web3ProviderEngine
}

declare module "web3-provider-engine/zero" {
  import * as Web3ProviderEngine from "web3-provider-engine"

  function ZeroClientProvider(opts: Web3ProviderEngine.ProviderOpts): Web3ProviderEngine

  namespace ZeroClientProvider {
  }

  export = ZeroClientProvider
}

declare module "web3-provider-engine/subproviders/filters" {
  class FiltersSubprovider {

  }

  namespace FiltersSubprovider {

  }

  export = FiltersSubprovider
}

declare module "web3-provider-engine/subproviders/sanitizer" {
  class SanitizingSubprovider {

  }

  namespace SanitizingSubprovider {

  }

  export = SanitizingSubprovider
}

declare module "web3-provider-engine/subproviders/cache" {
  class BlockCacheSubprovider {

  }

  namespace BlockCacheSubprovider {

  }

  export = BlockCacheSubprovider
}

declare module "web3-provider-engine/subproviders/subscriptions" {
  class SubscriptionSubprovider {

  }

  namespace SubscriptionSubprovider {

  }

  export = SubscriptionSubprovider
}

declare module "web3-provider-engine/subproviders/inflight-cache" {
  class InflightCacheSubprovider {

  }

  namespace InflightCacheSubprovider {

  }

  export = InflightCacheSubprovider
}

declare module "web3-provider-engine/subproviders/hooked-wallet" {
  import * as Web3 from 'web3'
  import * as Transaction from 'ethereumjs-tx'
  import * as Web3ProviderEngine from "web3-provider-engine";

  class HookedWalletSubprovider {
    engine: Web3ProviderEngine
    constructor(opts?: HookedWalletSubprovider.Options)
    getAccounts (callback: HookedWalletSubprovider.Callback<string[]>): void
  }

  namespace HookedWalletSubprovider {
    type Address = string
    type HexString = string
    export type Callback<A> = (err: Error|null|undefined, result?: A) => void
    export type Function1<A, B> = (a: A, callback: Callback<B>) => void
    export type MsgParams = { from: Address, data: HexString }
    export type TypedMsgParams = { from: Address, data: object }
    export type RecoveryParams = { sig: HexString, data: HexString }

    export interface Options {
      signTransaction?: Function1<any, any>
      signMessage?: Function1<MsgParams, HexString>
      signPersonalMessage?: Function1<MsgParams, HexString>
      signTypedMessage?: Function1<TypedMsgParams, HexString>
      getAccounts: (callback: Callback<Array<string>>) => void

      processTransaction?: Function1<Web3.TxData, HexString>
      processMessage?: Function1<MsgParams, HexString>
      processPersonalMessage?: Function1<MsgParams, HexString>
      processTypedMessage?: Function1<TypedMsgParams, HexString>
      approveTransaction?: Function1<Web3.TxData, boolean>
      approveMessage?: Function1<MsgParams, boolean>
      approvePersonalMessage?: Function1<MsgParams, boolean>
      approveTypedMessage?: Function1<TypedMsgParams, boolean>
      recoverPersonalSignature?: Function1<RecoveryParams, Address>
      publishTransaction?: Function1<HexString, HexString>
    }
  }

  export = HookedWalletSubprovider
}

declare module "web3-provider-engine/subproviders/provider" {
  import { Provider } from "web3/providers";

  class ProviderSubprovider {
    constructor (provider: Provider)
  }

  namespace ProviderSubprovider {

  }

  export = ProviderSubprovider
}

declare module "web3-provider-engine/subproviders/fetch" {
  class FetchSubprovider {
    constructor (options: FetchSubprovider.Options)
  }

  namespace FetchSubprovider {
    export interface Options {
      rpcUrl: string
    }
  }

  export = FetchSubprovider
}

declare module "web3-provider-engine/subproviders/websocket" {
  class WebSocketSubprovider {
    constructor (options: WebSocketSubprovider.Options)
  }

  namespace WebSocketSubprovider {
    export interface Options {
      rpcUrl: string
    }
  }

  export = WebSocketSubprovider
}
