import pandas as pd
import numpy as np


from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.callbacks import ModelCheckpoint
import matplotlib.pyplot as plt
from tensorflow.keras.utils import to_categorical

# from modelK import create_model
# from fun import Average
from biosppy.signals import eeg


METRICS = [
    keras.metrics.TruePositives(name='tp'),
    keras.metrics.FalsePositives(name='fp'),
    keras.metrics.TrueNegatives(name='tn'),
    keras.metrics.FalseNegatives(name='fn'),
    keras.metrics.BinaryAccuracy(name='accuracy'),
    keras.metrics.Precision(name='precision'),
    keras.metrics.Recall(name='recall'),
    keras.metrics.AUC(name='auc'),
    keras.metrics.AUC(name='prc', curve='PR'),  # precision-recall curve
]


################## Just change This Part, Do NOT change other parts #################
csv_path = 'test1.csv'
channel = 5  # From 0 to 3

time_window_size = 110  # step 0.125 seconds ====> 13.75 s
batch_size = 128  # 1024
epochs = 110
#####################################################################################


metric = "accuracy"


# load raw EEG signal
rawdata = pd.read_csv(csv_path)
lable = rawdata[rawdata.columns[1]].values.tolist()
eegData = np.array(rawdata[rawdata.columns[5:12]])

'''
neg, pos = np.bincount(rawdata['Drowsiness=1/Alert=0'])
total = neg + pos
print('Examples:\n    Total: {}\n    Positive: {} ({:.2f}% of total)\n'.format(
    total, pos, 100 * pos / total))
'''

print(eegData.shape)
# process it and plot
out = eeg.eeg(signal=eegData, sampling_rate=256., show=True)

timef = np.array(out[0])

########### time-step = 0.125 seconds ################
theta = np.array(out[3])
alpha_low = np.array(out[4])
alpha_high = np.array(out[5])
beta = np.array(out[6])
gamma = np.array(out[7])

theta = theta[:, channel]
alpha_low = alpha_low[:, channel]
alpha_high = alpha_high[:, channel]
beta = beta[:, channel]
gamma = gamma[:, channel]

theta = np.reshape(theta, (1, theta.shape[0]))  # / np.max(theta)
# / np.max(alpha_low)
alpha_low = np.reshape(alpha_low, (1, alpha_low.shape[0]))
# / np.max(alpha_high)
alpha_high = np.reshape(alpha_high, (1, alpha_high.shape[0]))
beta = np.reshape(beta, (1, beta.shape[0]))  # / np.max(beta)
gamma = np.reshape(gamma, (1, gamma.shape[0]))  # / np.max(gamma)


print('theta: ', theta)
print('theta.shape: ', theta.shape)

#print('lable: ',lable)
print('len(lable): ', len(lable))


x_train = []
y_train = []
temp_list = []
temp_list_y = []


for index in range(theta.shape[1]):
    temp_list = []
    temp_list_y = []

    # print(i)

    if index + time_window_size > theta.shape[1]-1:
        break
    ################################################

    a = theta[0, index: index+time_window_size]
    b = alpha_low[0, index: index+time_window_size]
    c = alpha_high[0, index: index+time_window_size]
    d = beta[0, index: index+time_window_size]
    e = gamma[0, index: index+time_window_size]

    x = np.dstack((a, b, c, d, e))
    #print('x before reshape: ',x[0,:,0])
    #print('x.shape before reshape: ',x.shape)
    x = np.reshape(x, (time_window_size, 5))
    #print('x after reshape: ',x[:,0])
    #print('x.shape after reshape: ',x.shape)

    '''
    if int((index + time_window_size)*256*0.125) > len(lable):
        break

    
    for j in range(time_window_size):
        temp_list_y.append(lable[int((index+j)*256*0.125)])

    y = Average(temp_list_y)
    '''
    y = lable[int((index)*256*0.125)]

    if y > 0.5:
        y = 1
    else:
        y = 0

    #print('Index: ',index)
    #print('temp_list_y: ', temp_list_y)
    #print('y: ', y)

    x_train.append(x)
    y_train.append(y)


print('len(x_train): ', len(x_train))
print('len(y_train): ', len(y_train))


x_train = np.array(x_train)
y_train = np.asarray(y_train)

#x_train = np.expand_dims(x_train, -1)

print('x_train input shape: ', x_train.shape)


#n_values = np.max(y_train) + 1
#y_train = np.eye(n_values)[y_train]

y_train = to_categorical(y_train)
print('y_train.shape: ', y_train.shape)
print('y_train: ', y_train)

#print('x_train[0]: ', x_train[0])
print('y_train[0]: ', y_train[0])

#print('x_train[-1]: ', x_train[-1])
print('y_train[-1]: ', y_train[-1])


model = create_model(time_window_size, METRICS)
model_save = ModelCheckpoint('best_ecg_model.h5', save_best_only=True)
history = model.fit(x_train, y_train, batch_size=batch_size, epochs=epochs,
                    validation_split=0.15, callbacks=[model_save], shuffle=True)


model.save('ecg_model.h5')  # creates a HDF5 file 'pcm_model.h5'


# Plot train vs test accuracy per epoch
plt.figure()
# Use the history metrics
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
# Make it pretty
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['Train', 'Test'])
plt.show()


# Plot train vs test accuracy per epoch
plt.figure()
# Use the history metrics
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
# Make it pretty
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Train', 'Test'])
plt.show()
