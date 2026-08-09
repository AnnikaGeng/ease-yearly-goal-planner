import * as Haptics from "expo-haptics";
import { usePathname } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useEffect, useRef } from "react";

export default function TabLayout() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="today">
        <Label>Today</Label>
        <Icon sf={"ellipsis.calendar"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="monthly">
        <Label>Monthly</Label>
        <Icon sf={"calendar"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="yearly">
        <Label>Yearly</Label>
        <Icon sf={"target"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="map">
        <Label>Map</Label>
        <Icon sf={"map"} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
