//
//  OCBarrageViewManager.m
//  template
//
//  Created by jiasong on 2018/6/26.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "OCBarrageViewManager.h"
#import "OCBarrageView.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@interface OCBarrageViewManager()


@end

@implementation OCBarrageViewManager


RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (UIView *)view {
  OCBarrageView *view = [[OCBarrageView alloc] init];
  return view;
}


RCT_EXPORT_METHOD(start:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, OCBarrageView *> *viewRegistry) {
    OCBarrageView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[OCBarrageView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view.barrageManager start];
    }
  }];
}

RCT_EXPORT_METHOD(stop:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, OCBarrageView *> *viewRegistry) {
    OCBarrageView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[OCBarrageView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view.barrageManager stop];
    }
  }];
}

RCT_EXPORT_METHOD(addNormalBarrage:(NSString *)content option:(NSDictionary *)option reactTag:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, OCBarrageView *> *viewRegistry) {
    OCBarrageView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[OCBarrageView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view addNormalContent:content option:option];
    }
  }];
}

RCT_EXPORT_METHOD(releaseOCBarrage:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, OCBarrageView *> *viewRegistry) {
    OCBarrageView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[OCBarrageView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view releaseOCBarrage];
    }
  }];
}


@end
