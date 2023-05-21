import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { SismoConnectButton, AuthType, SismoConnectClientConfig, SismoConnectResponse } from "@sismo-core/sismo-connect-react";
export const ConnectButtonStyled = ({ onClose }: { onClose: () => void }) => {
  const { openConnectModal } = useConnectModal();

  const onConnect = () => {
    openConnectModal?.();
    onClose();
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={onConnect}
                    type="button"
                    className="bg-yellow-200"
                    style={{
                      color: 'black',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-yellow-200"
                    style={{
                      color: 'black',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    className="bg-yellow-200"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'black',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <SismoConnectButton
                    config={{
                      appId: "0x7749db6b6273afef29cbe138dad02b52"
                    }}
                    // request multiple proofs of account ownership 
                    // (here Vault ownership and Twitter account ownership)
                    auths={[
                      { authType: AuthType.VAULT },
                      { authType: AuthType.TWITTER },
                    ]}
                    // request multiple proofs of group membership 
                    // (here the groups with id 0x42c768bb8ae79e4c5c05d3b51a4ec74a and 0x8b64c959a715c6b10aa8372100071ca7)
                    claims={[{
                      groupId: "0xeb8feea83ddaf266a806ee40c1b04fba"//gitcoin passport group
                    },
                    {
                      groupId: "0x091b1dae434d9de5eb51c34874e73351", //custom swissDAO group TBD
                    }]}
                    signature={{ message: "Your message" }}
                    onResponse={async (response: SismoConnectResponse) => {
                      //Send the response to your server to verify it
                      //thanks to the @sismo-core/sismo-connect-server package
                      //
                    }}
                    onResponseBytes={async (bytes: string) => {
                      //Send the response to your contract to verify it
                      //thanks to the @sismo-core/sismo-connect-solidity package
                      //now we clal the contract!
                      //but Oli didn't want to help
                    }}
                  />

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-yellow-200"
                    style={{
                      color: 'black',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
