import { MultisigAccountInfo } from './MultisigAccountInfo';
/**
 * Multisig account graph info model
 */
export declare class MultisigAccountGraphInfo {
    /**
                 * The multisig accounts.
                 */ readonly multisigAccounts: Map<number, MultisigAccountInfo[]>;
}
