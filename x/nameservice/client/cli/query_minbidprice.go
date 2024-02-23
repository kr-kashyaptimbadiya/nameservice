package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"nameservice/x/nameservice/types"
)

var _ = strconv.Itoa(0)

func CmdMinbidprice() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "minbidprice [name]",
		Short: "Query minbidprice",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqName := args[0]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryMinbidpriceRequest{

				Name: reqName,
			}

			res, err := queryClient.Minbidprice(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
