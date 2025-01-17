import { SwitchHorizontalIcon } from '@heroicons/react/outline';
import { SYSTEM } from '@lenster/data/tracking';
import { Button } from '@lenster/ui';
import { Leafwatch } from '@lib/leafwatch';
import { t, Trans } from '@lingui/macro';
import type { FC } from 'react';
import toast from 'react-hot-toast';
import { CHAIN_ID } from 'src/constants';
import { useSwitchNetwork } from 'wagmi';

interface SwitchNetworkProps {
  className?: string;
  onSwitch?: () => void;
}

const SwitchNetwork: FC<SwitchNetworkProps> = ({
  className = '',
  onSwitch
}) => {
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Button
      className={className}
      type="button"
      variant="danger"
      icon={<SwitchHorizontalIcon className="h-4 w-4" />}
      onClick={() => {
        onSwitch?.();
        if (switchNetwork) {
          switchNetwork(CHAIN_ID);
        } else {
          toast.error(t`Please change your network wallet!`);
        }
        Leafwatch.track(SYSTEM.SWITCH_NETWORK);
      }}
    >
      <Trans>Switch Network</Trans>
    </Button>
  );
};

export default SwitchNetwork;
