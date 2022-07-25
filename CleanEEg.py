from biosppy.signals import eeg
import pandas as pd
import numpy as np
import os
import sys

os.system('pip install biosppy pandas numpy matplotlib --user')

try:
    path = sys.argv[1]
    print('path: ', path)

    # load raw EEG signal

    #path = 'EEG_Mental Fatigue_01 - Copy.csv'

    rawdata = pd.read_csv(path)
    lable = np.array(rawdata[rawdata.columns[1]])
    eegData = np.array(rawdata[rawdata.columns[4:5]])

    print(eegData.shape)
    print('Calculating, Please wait...')
    # process it and plot
    out = eeg.eeg(signal=eegData, sampling_rate=256., show=True)
    # print(out)

    ########### time-step = 0.125 seconds ################
    theta_Raw = np.array(out[3])
    alpha_low_Raw = np.array(out[4])
    alpha_high_Raw = np.array(out[5])
    beta_Raw = np.array(out[6])
    gamma_Raw = np.array(out[7])

    for i in range(4):
        theta = theta_Raw[:, i]
        alpha_low = alpha_low_Raw[:, i]
        alpha_high = alpha_high_Raw[:, i]
        beta = beta_Raw[:, i]
        gamma = gamma_Raw[:, i]

        pd.DataFrame(zip(theta, alpha_low, alpha_high, beta, gamma),
                     columns=['theta', 'alpha_low',
                              'alpha_high', 'beta', 'gamma', ]).to_csv('Ch'+str(i)+'-output.csv')

    print('End!')

except Exception as e:
    print(e)
    print('Something is Wrong!')
