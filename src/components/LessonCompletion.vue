<template>
    <div class="lesson-completion">
        <div class="text">
            <h1>{{ $t('lessonCompletion.title') }} <span class="lesson-name">{{ $t(`activities.${activity.id}.title`)
                    }}</span></h1>
            <p>{{ $t('lessonCompletion.subtitle') }}</p>
        </div>

        <Card class="mt-2 see-more">
            <template #title>{{ $t("lessonCompletion.seeMore") }}</template>
            <template #content>
                <div v-html="$t(`activities.${activity.id}.readMore`)"></div>
            </template>
        </Card>

        <div class="figures">
            <svg id="hourglass" width="305" height="290" viewBox="0 0 305 290" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M290.782 205.104C299.728 206.338 306.658 197.428 303.261 189.061L229.457 7.32287C226.059 -1.04464 214.879 -2.59976 209.327 4.52252L138.445 95.4401C135.871 98.7419 131.733 100.422 127.586 99.8505L13.357 84.102C4.41098 82.8687 -2.51816 91.7779 0.879659 100.145L74.6846 281.887C78.0825 290.254 89.2614 291.81 94.8146 284.689L165.721 193.757C168.295 190.456 172.433 188.776 176.581 189.348L290.782 205.104Z"
                    fill="#22C55E" />
            </svg>

            <svg id="circle" width="249" height="250" viewBox="0 0 249 250" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M215.409 209.267C226.343 197.256 227.089 179.148 218.713 163.911C235.375 158.956 247.568 145.556 248.23 129.321C248.892 113.086 237.819 98.7488 221.611 92.447C231.178 77.9447 231.904 59.8337 221.976 46.9783C212.047 34.1228 194.34 30.2487 177.88 35.848C175.887 18.585 164.805 4.23694 148.93 0.774796C133.055 -2.68735 117.009 5.72271 108.004 20.5918C95.3786 8.63623 77.6691 4.78152 63.2848 12.3255C48.9006 19.8695 42.0174 36.6304 44.6587 53.8099C27.3033 52.7778 11.2657 61.1988 5.09595 76.2261C-1.07376 91.2531 4.42128 108.525 17.494 119.978C3.53227 130.344 -3.33987 147.096 1.59018 162.577C6.52023 178.059 21.8312 187.749 39.2129 188.117C35.1762 205.027 40.6822 222.29 54.415 230.973C68.1477 239.655 86.1013 237.251 99.651 226.351C107.429 241.894 122.74 251.584 138.85 249.404C154.959 247.224 167.149 233.843 170.537 216.791C186.488 223.708 204.436 221.273 215.381 209.254L215.409 209.267Z"
                    fill="#0EA5E9" />
            </svg>

            <svg id="star1" width="241" height="242" viewBox="0 0 241 242" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M119.676 45.4343C122.829 49.5888 128.796 50.3287 132.868 47.0705L173.791 14.334C180.735 8.77903 190.776 15.2347 188.58 23.8425L175.639 74.5682C174.351 79.6177 177.494 84.7342 182.588 85.8819L233.772 97.414C242.456 99.3704 243.663 111.226 235.549 114.876L187.732 136.39C182.973 138.531 180.925 144.171 183.204 148.86L206.103 195.978C209.988 203.972 201.453 212.3 193.531 208.245L146.837 184.344C142.19 181.965 136.494 183.882 134.242 188.582L111.619 235.802C107.78 243.815 95.9291 242.346 94.1638 233.638L83.7599 182.319C82.7242 177.211 77.6691 173.962 72.5818 175.132L21.4632 186.9C12.7904 188.897 6.54898 178.736 12.2697 171.933L45.9873 131.838C49.3431 127.848 48.7354 121.879 44.6435 118.64L3.53236 86.0944C-3.44331 80.5724 0.623624 69.371 9.52269 69.5958L61.9723 70.9194C67.1925 71.0513 71.4902 66.8577 71.475 61.6465L71.321 9.29374C71.2949 0.410582 82.6085 -3.3962 87.9846 3.68651L119.676 45.4343Z"
                    fill="#EF4444" />
            </svg>

            <svg id="start2" width="239" height="243" viewBox="0 0 239 243" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M99.7066 53.4535C104.164 56.1617 109.986 54.6618 112.58 50.1368L138.644 4.67197C143.066 -3.04276 154.775 -0.71973 155.889 8.09357L162.456 60.0303C163.11 65.2003 167.91 68.8076 173.07 68.0067L224.916 59.9619C233.713 58.5968 239.184 69.1835 232.975 75.5551L196.381 113.108C192.738 116.846 192.902 122.843 196.742 126.37L235.328 161.805C241.874 167.817 236.989 178.695 228.131 177.829L175.925 172.72C170.729 172.211 166.133 176.083 165.762 181.282L162.036 233.509C161.403 242.372 149.839 245.351 145.003 237.898L116.501 193.971C113.664 189.6 107.769 188.43 103.466 191.386L60.2265 221.083C52.8903 226.121 43.357 218.958 46.1839 210.531L62.8456 160.863C64.5039 155.92 61.7492 150.59 56.7545 149.078L6.57132 133.879C-1.94356 131.301 -2.26855 119.388 6.09275 116.333L55.3724 98.3271C60.2772 96.5351 62.7372 91.0575 60.8117 86.215L41.4663 37.5674C38.1838 29.3129 47.3126 21.6218 54.9119 26.239L99.7066 53.4535Z"
                    fill="#A855F7" />
            </svg>

        </div>
    </div>
</template>

<style>
.lesson-completion {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: var(--bluegray-900);
    padding: 1px;
    padding-right: var(--sidebar-padding);

    .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-grow: 1;
        max-width: 1000px;

        h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;

            .lesson-name {
                color: var(--purple-700);
            }
        }

        p {
            font-weight: 400;
            margin: 0;
        }
    }

    .see-more {
        max-width: 1000px;
        width: 100%;
        background-color: white;
    }
}

.lesson-completion .figures {
    position: absolute;
    inset: 20px;
    overflow: hidden;
    z-index: -1;

    svg {
        position: absolute;
        width: 20vw;
        height: fit-content;
        opacity: 10%;
        animation: slight-animation ease-in-out infinite;
        --bottom-margin: 0px;
    }

    @media (max-width: 1200px) {
        svg {
            --bottom-margin: 100px;
        }
    }

    @media (max-width: 900px) {
        inset: 0;

        svg {
            width: 30vw;
        }
    }

    #hourglass {
        bottom: calc(3% + var(--bottom-margin));
        right: 6%;
        --random-angle: 9deg;
        animation-duration: 12s;
    }

    #circle {
        top: 0;
        left: 7%;
        --random-angle: 3deg;
        animation-duration: 6s;
    }

    #star1 {
        top: 2%;
        right: 1%;
        --random-angle: 5deg;
        animation-duration: 8s;
    }

    #start2 {
        bottom: calc(4% + var(--bottom-margin));
        left: 0;
        --random-angle: 7deg;
        animation-duration: 10s;
    }

}

@keyframes slight-animation {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(calc(10deg + var(--random-angle)));
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>

<script>
export default {
    name: 'LessonCompletion',
    props: {
        activity: {
            type: Object,
            required: true,
        },
    }
}
</script>