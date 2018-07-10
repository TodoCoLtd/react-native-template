//
//  LivePlayerManager.m
//  liveToDo
//
//  Created by jiasong on 2018/6/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "LivePlayerManager.h"
#import "LivePlayer.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@interface LivePlayerManager()

@end

@implementation LivePlayerManager

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (UIView *)view {
  LivePlayer *livePlayer = [[LivePlayer alloc] init];
  return livePlayer;
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(onLiveLoadStart, RCTBubblingEventBlock);


/*
 功能：开始播放视频
 备注：在prepareWithVid之后可以调用start进行播放。
 */
RCT_EXPORT_METHOD(start:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, LivePlayer *> *viewRegistry) {
    LivePlayer *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[LivePlayer class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view.aliPlayer start];
    }
  }];
}
/*
 功能：停止播放视频
 */
RCT_EXPORT_METHOD(stop:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, LivePlayer *> *viewRegistry) {
    LivePlayer *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[LivePlayer class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view.aliPlayer stop];
    }
  }];
}
/*
 功能：暂停播放视频
 备注：在start播放视频之后可以调用pause进行暂停。
 */
RCT_EXPORT_METHOD(pause:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, LivePlayer *> *viewRegistry) {
    LivePlayer *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[LivePlayer class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view.aliPlayer pause];
    }
  }];
}
/*
 功能：恢复播放视频
 备注：在pause暂停视频之后可以调用resume进行播放。
 */
RCT_EXPORT_METHOD(resume:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, LivePlayer *> *viewRegistry) {
    LivePlayer *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[LivePlayer class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view.aliPlayer resume];
    }
  }];
}
/*
 功能：重播，重新播放上一次url地址视频。
 */
RCT_EXPORT_METHOD(replay:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, LivePlayer *> *viewRegistry) {
    LivePlayer *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[LivePlayer class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view.aliPlayer replay];
    }
  }];
}

/*
 功能：销毁播放器
 */
RCT_EXPORT_METHOD(releasePlayer:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, LivePlayer *> *viewRegistry) {
    LivePlayer *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[LivePlayer class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view releasePlayer];
    }
  }];
}

@end
