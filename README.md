## Step 1: Clone the Repo



git clone https://github.com/IAmRahul123/heathflex.git

cd timers_heathflex

## Step 2: Install Dependencies

npm install


## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Assumption

1. I have not added dropdown for category , so for same value (uppercase or lowercase) it will consider same category and group the timers
2. Duration is in seconds (not minute or hours) and it expects only positive numbers without any decimal value
3. For light and dark mode, it will take colora based on current theme of your phone(Can not be changed for now)
4. For Modal, I am showing an alert not an Modal of react-native or any third party library


