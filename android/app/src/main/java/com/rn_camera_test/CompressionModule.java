package com.rn_camera_test;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import rx.Subscriber;
import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Action0;

import android.app.Activity;
import android.net.Uri;
import android.text.format.Formatter;
import java.io.File;

import com.github.tcking.giraffecompressor.GiraffeCompressor;

public class CompressionModule extends ReactContextBaseJavaModule {
  public CompressionModule(ReactApplicationContext reactContext) {
    super(reactContext);
    System.out.println("Creating compressor instance..");
    System.out.println("Initializing compressor..");
    GiraffeCompressor.DEBUG = true;
    GiraffeCompressor.init(reactContext);
  }

  @Override
  public String getName() {
    return "CompressionModule";
  }

  @ReactMethod
  public void compress(Uri inputFileUri, Uri outputFileUri, Callback onStart, Callback onProgress, Callback onDone, Callback onError) {
    File inputFile = new File(inputFileUri.getPath());
    File outputFile = new File(outputFileUri.getPath());

    GiraffeCompressor
      .create("ffmpeg")
      .input(inputFile)
      .output(outputFile)
      .bitRate(2073600)
      .resizeFactor(1.0f)
      .ready()
      .doOnSubscribe(new Action0() {
          @Override
          public void call() {
            //comprimindo...
            onStart.invoke("Comprimindo..");
          }
      })
      .observeOn(AndroidSchedulers.mainThread())
      .subscribe(new Subscriber<GiraffeCompressor.Result>() {
        @Override
        public void onCompleted() {
            onDone.invoke(outputFile.getAbsolutePath());
        }

        @Override
        public void onError(Throwable e) {
            e.printStackTrace();
            onError.invoke(e.toString());
        }

        @Override
        public void onNext(GiraffeCompressor.Result s) {
            String msg = String.format("compress completed \ntake time:%s ms \noutput file:%s", s.getCostTime(), s.getOutput());
            msg = msg + "\ninput file size:" + Formatter.formatFileSize(null, inputFile.length());
            msg = msg + "\nout file size:" + Formatter.formatFileSize(null, new File(s.getOutput()).length());
            System.out.println(msg);

            onDone.invoke(msg);
        }
    });

  }
}