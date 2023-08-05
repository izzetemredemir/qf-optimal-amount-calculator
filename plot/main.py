import json
import pandas as pd

# Load the data
with open("/mnt/data/donation_percentage_changes.json", "r") as read_file:
    data = json.load(read_file)

# Convert the data to a pandas DataFrame
df = pd.DataFrame(data)

df.head()

import matplotlib.pyplot as plt

# Create a figure and a set of subplots
fig, ax1 = plt.subplots()

# Plot donation and percentage on the same graph
color = 'tab:blue'
ax1.set_xlabel('Donation')
ax1.set_ylabel('Percentage', color=color)
ax1.plot(df['donation'], df['percentage'], color=color)
ax1.tick_params(axis='y', labelcolor=color)

# Create a twin Axes sharing the x-axis
ax2 = ax1.twinx()

color = 'tab:red'
ax2.set_ylabel('Amount', color=color)  # we already handled the x-label with ax1
ax2.plot(df['donation'], df['amount'], color=color)
ax2.tick_params(axis='y', labelcolor=color)

# Set the title
fig.suptitle('Donation vs Percentage and Amount', fontsize=16)

# Set the layout to tight
fig.tight_layout()

plt.show()
