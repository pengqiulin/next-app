interface LoginApi {
    delegate: string; //owner地址
    expiration: number; // 超时时间
    signature: string; // 签名数据
    chainId: number; //链ID
}

interface GetAnnouncementApi {
    phase: number;
}

interface GetLotteryPoolDetailApi {
    phase: number;
}

interface GetMyAssetsApi {
    phase: number; // 期数 0 代表全部
}

interface GetMyAssetsDetailApi {
    item: number;
}

interface GetOpenMagicBoxSeedApi {
    phase: number;
}

interface OpenMagicBoxApi {
    amount: number;
    nonce: number;
    signature: string;
    chainId: number;
    cmid: string; // 社区Id
}

interface OpenMagicBoxStreamApi {
    phase: number;
}

interface GetMyShipSnapshotSignApi {
    phase: number;
}

interface CheckBuyMagicBoxApi {
    txHash: string;
}

interface OpenLuckyBoxApi {
    chainId: number;
    tokenId: string[];
    cmid: string; // 社区Id
}
interface GetUserRemindApi {
    phase: number;
    item: AssetsType_Table[];
}
interface SyncUserRemindApi {
    read: Array<{
        phase: number;
        item: AssetsType_Table;
        seq: number;
    }>;
}
interface newTransferOrderApi {
    order: string;
    to: string;
    item: AssetsType_Table;
    amount: number;
    tokenId: string;
}
interface submitOrderTxApi extends newTransferOrderApi {
    txid: string;
}
