export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string;
          id: number;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      inventory_management: {
        Row: {
          created_at: string;
          id: number;
          pd_code: string | null;
          pd_name: string | null;
          wholesale_domain: string | null;
          wholesale_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          pd_code?: string | null;
          pd_name?: string | null;
          wholesale_domain?: string | null;
          wholesale_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          pd_code?: string | null;
          pd_name?: string | null;
          wholesale_domain?: string | null;
          wholesale_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_management_wholesale_id_fkey";
            columns: ["wholesale_id"];
            isOneToOne: false;
            referencedRelation: "wholesale";
            referencedColumns: ["id"];
          }
        ];
      };
      inventory_optinos: {
        Row: {
          created_at: string;
          id: number;
          inven_id: number | null;
          name: string | null;
          price: string | null;
          stock: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          inven_id?: number | null;
          name?: string | null;
          price?: string | null;
          stock?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          inven_id?: number | null;
          name?: string | null;
          price?: string | null;
          stock?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_optinos_inven_id_fkey";
            columns: ["inven_id"];
            isOneToOne: false;
            referencedRelation: "inventory_management";
            referencedColumns: ["id"];
          }
        ];
      };
      post: {
        Row: {
          category: number | null;
          content: string | null;
          created_at: string;
          id: number;
          imageUrl: string | null;
          title: string | null;
        };
        Insert: {
          category?: number | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          imageUrl?: string | null;
          title?: string | null;
        };
        Update: {
          category?: number | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          imageUrl?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          }
        ];
      };
      wholesale: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          url?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"])
  ? (Database["public"]["Tables"] & Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"] : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
