import Image, { ImageProps } from 'next/image';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

import { Box, Text } from '@/components';
import { useCunninghamTheme } from '@/cunningham';
import { useResponsiveStore } from '@/stores';

export type HomeSectionProps = {
  illustration?: ImageProps['src'];
  title: string;
  description: string;
  tag: string;
  availableSoon?: boolean;
  shadow?: boolean;
  isColumn?: boolean;
  reverse?: boolean;
};
export const HomeSection = ({
  illustration,
  title,
  description,
  tag,
  reverse = false,
  isColumn = true,
  availableSoon = false,
  shadow = false,
}: HomeSectionProps) => {
  const { t } = useTranslation();
  const { spacingsTokens } = useCunninghamTheme();
  const spacings = spacingsTokens();

  const { isDesktop } = useResponsiveStore();

  const direction = useMemo(() => {
    if (!isDesktop) {
      return 'column';
    } else if (isColumn) {
      return reverse ? 'column-reverse' : 'column';
    }

    return reverse ? 'row-reverse' : 'row';
  }, [isColumn, isDesktop, reverse]);

  return (
    <Box
      $direction={direction}
      $gap={spacings['lg']}
      $padding={{
        horizontal: isDesktop ? '6xl' : spacings['md'],
      }}
      $align={isDesktop ? 'flex-start' : 'center'}
      $justify={isDesktop ? 'flex-start' : 'center'}
    >
      <Box $gap={spacings['sm']} $maxWidth="850px" $width="100%">
        <Box $direction="row" $gap={spacings['sm']} $wrap="wrap">
          <SectionTag tag={tag} />
          {availableSoon && (
            <SectionTag tag={t('Available soon')} availableSoon />
          )}
        </Box>
        <Text
          $css={css`
            line-height: 50px;
          `}
          $variation="1000"
          $weight="bold"
          $size={isDesktop ? 'xs-alt' : 'h1'}
        >
          {title}
        </Text>
        <Text $variation="700" $weight="400" $size="md">
          {description}
        </Text>
      </Box>

      {illustration && (
        <Image
          src={illustration}
          alt="SC4Illustration"
          style={{
            maxWidth: 'calc(100dvw - 50px)',
            height: 'auto',
            boxShadow: shadow
              ? '0px 5px 25.1px 0px rgba(0, 0, 0, 0.08)'
              : 'none',
          }}
        />
      )}
    </Box>
  );
};

const SectionTag = ({
  tag,
  availableSoon,
}: {
  tag: string;
  availableSoon?: boolean;
}) => {
  const { colorsTokens, spacingsTokens } = useCunninghamTheme();
  const spacings = spacingsTokens();
  const colors = colorsTokens();
  return (
    <Box
      $background={
        !availableSoon ? colors['primary-100'] : colors['warning-100']
      }
      $padding={{ horizontal: spacings['sm'], vertical: '6px' }}
      $css={css`
        align-self: flex-start;
        border-radius: 4px;
      `}
    >
      <Text
        $size="md"
        $variation={availableSoon ? '600' : '800'}
        $weight="bold"
        $theme={availableSoon ? 'warning' : 'primary'}
      >
        {tag}
      </Text>
    </Box>
  );
};
